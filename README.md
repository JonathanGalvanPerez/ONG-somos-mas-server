# Server Base - Proyecto ONG


## Envinroment setup

1) Create database
2) Copy .env.example to .env and fill with database credentials.

To install dependencies, run
``` bash
npm install
```

3) Migrations:
``` bash
npx sequelize-cli db:migrate
```

4) Seeders:
``` bash
npx sequelize-cli db:seed:all
```

## Start local server

``` bash
npm start
```

## Test Users:


1. Admin users:


|   Name    | Last name  |      Email      | Password |

| :-------: | :--------: | :-------------: | :------: |

|  Facundo  |  Martinez  | test0@test0.com |  123456  |

| Alejandro |    Sosa    | test1@test1.com |  123456  |

|  Braulio  |  Salazar   | test2@test2.com |  123456  |

|  Fabian   |   Romero   | test3@test3.com |  123456  |

|   Brian   |  Retamar   | test4@test4.com |  123456  |

|  Mariano  | Collavino  | test5@test5.com |  123456  |

| Jonathan  |   Perez    | test6@test6.com |  123456  |

|  Samuel   |  Benitez   | test7@test7.com |  123456  |

|  Victor   | Valenzuela | test8@test8.com |  123456  |

|   Dante   | Militello  | test9@test9.com |  123456  |


2. Standard users:


| Name  | Last name |        Email        | Password |

| :---: | :-------: | :-----------------: | :------: |

| John  |   Smith   |   john@smith.com    |  123456  |

|  Joe  |   Smith   |    joe@smith.com    |  123456  |

|  Bob  |   Smith   |    bob@smith.com    |  123456  |

| Mike  |   Smith   |   mike@smith.com    |  123456  |

| Juan  |  Carlos   |   juan@carlos.com   |  123456  |

| Jane  |   Smith   |   jane0@smith.com   |  123456  |

| Mike  |   Jones   |   mike@jones.com    |  123456  |

| David |   Smith   |  david0@smith.com   |  123456  |

| Linda | Chandler  | linda0@chandler.com |  123456  |

| Hilda |   Hills   |   hilda@hills.com   |  123456  |