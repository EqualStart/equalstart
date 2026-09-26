<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>Равный старт</title>

    <style>
        * {
            box-sizing: border-box;
        }

        html {
            scroll-behavior: smooth;
        }

        body {
            margin: 0;
            font-family: Arial, sans-serif;
            color: #222;
            background: #f7f7f5;
            line-height: 1.65;
        }

        header {
            background: white;
            padding: 24px 20px;
            border-bottom: 1px solid #e5e5e5;
        }

        .header-inner {
            max-width: 1000px;
            margin: auto;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .logo {
            font-size: 22px;
            font-weight: bold;
        }

        nav a {
            margin-left: 22px;
            color: #555;
            text-decoration: none;
        }

        nav a:hover {
            color: #000;
        }

        .hero {
            max-width: 1000px;
            margin: auto;
            padding: 100px 20px 90px;
        }

        .hero h1 {
            font-size: 54px;
            line-height: 1.1;
            max-width: 750px;
            margin: 0 0 25px;
        }

        .hero p {
            font-size: 21px;
            max-width: 680px;
            color: #555;
        }

        .button {
            display: inline-block;
            margin-top: 25px;
            padding: 13px 22px;
            background: #222;
            color: white;
            text-decoration: none;
            border-radius: 6px;
        }

        .section {
            background: white;
            padding: 80px 20px;
            border-top: 1px solid #e5e5e5;
        }

        .section.alt {
            background: #f7f7f5;
        }

        .section-inner {
            max-width: 1000px;
            margin: auto;
        }

        .text {
            max-width: 720px;
        }

        h2 {
            font-size: 34px;
            margin-top: 0;
            margin-bottom: 25px;
        }

        p {
            font-size: 18px;
        }

        .stats {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 20px;
            margin-top: 45px;
        }

        .stat {
            padding: 30px;
            background: #f7f7f5;
            border-radius: 8px;
        }

        .stat-number {
            font-size: 38px;
            font-weight: bold;
        }

        .stat-text {
            color: #666;
        }

        .archive-box {
            margin-top: 35px;
            padding: 30px;
            border: 1px solid #ddd;
            border-radius: 8px;
            max-width: 720px;
        }

        .archive-box strong {
            font-size: 18px;
        }

        .final-line {
            font-size: 25px;
            line-height: 1.4;
            font-weight: bold;
            margin-top: 40px;
        }

        .quote {
            max-width: 850px;
            margin: auto;
            padding: 100px 20px;
            text-align: center;
            font-size: 30px;
            line-height: 1.45;
            font-weight: bold;
        }

        footer {
            max-width: 1000px;
            margin: auto;
            padding: 40px 20px;
            color: #777;
            font-size: 14px;
        }

        @media (max-width: 700px) {

            .header-inner {
                display: block;
            }

            nav {
                margin-top: 15px;
            }

            nav a {
                margin-left: 0;
                margin-right: 15px;
            }

            .hero {
                padding-top: 70px;
                padding-bottom: 70px;
            }

            .hero h1 {
                font-size: 40px;
            }

            .stats {
                grid-template-columns: 1fr;
            }

            .quote {
                font-size: 25px;
            }
        }
    </style>
</head>

<body>

<header>
    <div class="header-inner">

        <div class="logo">
            Равный старт
        </div>

        <nav>
            <a href="#about">О проекте</a>
            <a href="#archive">Архив</a>
            <a href="#why">Зачем</a>
        </nav>

    </div>
</header>


<section class="hero">

    <h1>
        Добро, которое продолжается.
    </h1>

    <p>
        Каждый ребёнок заслуживает возможности выбирать,
        мечтать и получать поддержку независимо от обстоятельств,
        в которых он оказался.
    </p>

    <a class="button" href="#archive">
        Смотреть архив
    </a>

</section>


<section class="section" id="about">

    <div class="section-inner">

        <div class="text">

            <h2>Проект сегодня</h2>

            <p>
                Сейчас мы начинаем с простого:
                дети сами выбирают подарки на свои дни рождения,
                а мы помогаем этим желаниям осуществиться.
            </p>

        </div>


        <div class="stats">

            <div class="stat">
                <div class="stat-number">2</div>
                <div class="stat-text">детских дома</div>
            </div>

            <div class="stat">
                <div class="stat-number">30+</div>
                <div class="stat-text">подарков передано</div>
            </div>

            <div class="stat">
                <div class="stat-number">2025</div>
                <div class="stat-text">начало проекта</div>
            </div>

        </div>

    </div>

</section>


<section class="section alt" id="archive">

    <div class="section-inner">

        <div class="text">

            <h2>Архив подарков</h2>

            <p>
                Здесь сохраняется история каждого подарка.
            </p>

            <div class="archive-box">

                <strong>Факты:</strong>

                <p>
                    что было выбрано, когда куплено
                    и когда передано.
                </p>

            </div>

        </div>

    </div>

</section>


<section class="section" id="why">

    <div class="section-inner">

        <div class="text">

            <h2>Зачем это нужно</h2>

            <p>
                Мы создаём систему, где вклад одного человека
                становится возможностями для многих
                и продолжает работать после него.
            </p>

            <p>
                Сегодня это подарки.
            </p>

            <p>
                Завтра — образование, спорт,
                развитие талантов и другие возможности.
            </p>

            <p class="final-line">
                Равный старт — возможности,
                которые мы передаём дальше.
            </p>

        </div>

    </div>

</section>


<div class="quote">

    Мы не можем сделать жизнь длиннее.<br>
    Но можем сделать длиннее добро,
    которое остаётся после нас.

</div>


<footer>
    © Равный старт
</footer>


</body>
</html>
