<script>
</script>

<div id="header" class="container">
    <div class="page-title"><a href="/"> <h1>IAAF Scores</h1></a></div>
    <div class="page-links">
        <div class="links">
            <a id="charts-link" href="/charts">Progress Charts</a><span id="new"
                >NEW!</span
            >
            <a class="mobile-hide" href="/">Scores</a>
            <a
                class="mobile-hide"
                target="blank"
                href="https://www.rileythomp.com/writeups/iaafscores.html"
                >About</a
            >
        </div>
    </div>
</div>

<hr />

<style>
    hr {
        margin-bottom: 2em;
        margin-left: 2em;
        margin-right: 2em;
    }
    h1 {
        color: white;
        font-size: 5em;
    }

    #header {
        position: relative;
        top: 0;
        right: 0;
    }

    .container {
        display: flex;
        flex-direction: row;
    }

    .page-title {
        padding-left: 2em;
        padding-right: 1em;
    }

    .page-links {
        flex-grow: 1;
    }

    .links {
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        align-items: center;
        height: 100%;
    }

    .links a {
        margin-left: 2em;
        margin-right: 2em;
        color: white;
        font-size: 2em;
    }

    .links a:hover {
        text-decoration: underline;
    }

    .links a:nth-child(4) {
        margin-right: 5em;
    }

    #charts-link {
        margin-right: 0.25em;
    }

    #new {
        margin-right: 4em;
        font-weight: bold;
        background-color: white;
        color: #242424;
        padding: 2px 4px;
        border-radius: 5px;
        margin-bottom: 2em;
    }

    #new:hover {
        cursor: pointer;
    }

    @media (max-width: 1024px) {
        h1 {
            font-size: 2em;
            margin-bottom: 0.5em;
        }

        .page-title {
            padding-left: 0;
        }

        .links {
            display: flex;
            align-items: center;
            float: right;
        }

        .links a {
            margin-left: 0;
            font-size: 1em;
        }

        .links a:nth-child(4) {
            margin-right: 0;
        }

        #charts-link {
            margin-right: 0;
        }

        hr {
            margin: 0;
            margin-top: 0.5em;
            margin-bottom: 0.75em;
        }

        .mobile-hide,
        #new {
            display: none;
        }
    }

    @media (prefers-color-scheme: light) {
        h1,
        .links a {
            color: #242424;
        }

        #new {
            background-color: #242424;
            color: white;
        }
    }
</style>
