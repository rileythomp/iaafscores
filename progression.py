from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
import requests
from bs4 import BeautifulSoup
import json

app = FastAPI()

origins = [
    "http://localhost:5173",
    "https://iaafscores.com",
    "https://iaafscores.netlify.app",
]

app.add_middleware(CORSMiddleware, allow_origins=origins)

field_events = ["HJ", "PV", "LJ", "TJ", "SP", "DT", "HT", "JT", "DEC", "HEP", "PEN"]


@app.get("/")
def read_root(
    search: str = Query(None),
    event: str = Query(None),
    season: str = Query("outdoor"),
):
    url = (
        "https://jto4g4p7gfa6hncqfp3e24pi6q.appsync-api.eu-west-1.amazonaws.com/graphql"
    )
    headers = {"x-api-key": "da2-5kch5ryyuvamlcz3vbuipn6rbi"}
    payload = {
        "operationName": "SearchCompetitors",
        "variables": {"query": f"{search if search is not None else ''}"},
        "query": "query SearchCompetitors($query: String, $gender: GenderType, $disciplineCode: String, $environment: String, $countryCode: String) {\n  searchCompetitors(query: $query, gender: $gender, disciplineCode: $disciplineCode, environment: $environment, countryCode: $countryCode) {\n    aaAthleteId\n    familyName\n    givenName\n    birthDate\n    disciplines\n    iaafId\n    gender\n    country\n    urlSlug\n    __typename\n  }\n}\n",
    }
    response = requests.post(url, headers=headers, json=payload)

    if response.status_code != 200:
        raise HTTPException(status_code=500, detail="error fetching data")

    res = response.json()

    if len(res["data"]["searchCompetitors"]) < 1:
        raise HTTPException(status_code=404, detail="no athlete found")

    url_slug = res["data"]["searchCompetitors"][0]["urlSlug"]
    url = f"https://worldathletics.org/athletes/{url_slug}"
    response = requests.get(url)
    html = response.text
    soup = BeautifulSoup(html, "html.parser")
    script_tag = soup.find("script", id="__NEXT_DATA__")

    if not script_tag:
        raise HTTPException(status_code=500, detail="error fetching data")

    obj = json.loads(script_tag.string)
    progressions = obj["props"]["pageProps"]["competitor"]["progressionOfSeasonsBests"]
    athlete_info = obj["props"]["pageProps"]["competitor"]["basicData"]
    athlete_name = (
        f"{athlete_info['givenName']} {athlete_info['familyName'].capitalize()}"
    )
    for prog in progressions:
        if prog["disciplineCode"] == event and prog["indoor"] == (season == "indoor"):
            discipline = prog["discipline"]
            results = prog["results"]
            data = [["Season", "Performance"]]
            for result in results:
                data.append(
                    [
                        result["season"],
                        float(result["mark"])
                        if event in field_events
                        else result["mark"],
                    ]
                )
            if len(data) < 3:
                raise HTTPException(
                    status_code=404,
                    detail="this athlete does not have enough performances in this event",
                )
            return {"name": athlete_name, "discipline": discipline, "data": data}
    else:
        raise HTTPException(status_code=404, detail="couldnt find event")
