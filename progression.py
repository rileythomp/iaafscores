from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
import requests
from bs4 import BeautifulSoup
import json

app = FastAPI()

origins = [
    'http://localhost:5173'
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins
)

@app.get("/")
def read_root(
    search: str = Query(None),
    event: str = Query(None),
    outdoor: str = Query('outdoor'),
):
    url = 'https://jto4g4p7gfa6hncqfp3e24pi6q.appsync-api.eu-west-1.amazonaws.com/graphql'
    headers = {'x-api-key': 'da2-5kch5ryyuvamlcz3vbuipn6rbi'}
    payload = {"operationName":"SearchCompetitors","variables":{"query":f"{search if search is not None else ''}"},"query":"query SearchCompetitors($query: String, $gender: GenderType, $disciplineCode: String, $environment: String, $countryCode: String) {\n  searchCompetitors(query: $query, gender: $gender, disciplineCode: $disciplineCode, environment: $environment, countryCode: $countryCode) {\n    aaAthleteId\n    familyName\n    givenName\n    birthDate\n    disciplines\n    iaafId\n    gender\n    country\n    urlSlug\n    __typename\n  }\n}\n"}
    response = requests.post(url, headers=headers, json=payload)
    if response.status_code == 200:
        res = response.json()
        url_slug = res['data']['searchCompetitors'][0]['urlSlug']
        url = f'https://worldathletics.org/athletes/{url_slug}'
        response = requests.get(url)
        html = response.text
        soup = BeautifulSoup(html, 'html.parser')
        script_tag = soup.find('script', id='__NEXT_DATA__')
        if script_tag:
            obj = json.loads(script_tag.string)
            progressions = obj['props']['pageProps']['competitor']['progressionOfSeasonsBests']
            indoor = outdoor != 'outdoor' 
            for prog in progressions:
                if prog['disciplineCode'] == event and prog['indoor'] == indoor:
                    results = prog['results']
                    data = [['Season', 'Performance']]
                    for result in results:
                        data.append([result['season'], float(result['mark'])])
                    return data
            else:
                print('couldnt find event')
                raise HTTPException(status_code=404, detail='couldnt find event')
        else:
            raise HTTPException(status_code=500, detail='error fetching data')
    else:
        raise HTTPException(status_code=500, detail="error fetching data")
