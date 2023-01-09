<script>
</script>

<div id='header' class='container'>
    <div class='page-title'>
        <h1>
            IAAF Scores
        </h1>
    </div>
    <div class='page-links'>
        <div class='links'>
            <a href="/">Home</a>
            <a target="blank" href="https://www.rileythomp.com/writeups/iaafscores.html">About</a>
        </div>
    </div>
</div>
  

<style>
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

    .links a:nth-child(2) {
        margin-right: 5em;
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
            padding-right: 1em;
        }

        .links a {
            margin-left: 0;
            font-size: 1em;
        }

        .links a:nth-child(2) {
            margin-right: 0;
        }
    }

    @media (prefers-color-scheme: light) {
        h1, .links a {
            color: black;
        }
    }

</style>