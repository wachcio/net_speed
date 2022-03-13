# net_speed

Mały skrypt służący do pomiaru prędkości internetu i zapisywaniu wyników do pliku. Korzysta z Speedtest.net CLI (https://www.speedtest.net/pl/apps/cli) który trzeba wcześniej zainstalować w komputerze.
Drugim elementem który jest niezbędny to NodeJS które można zainstalować ze strony (https://nodejs.org/en/) lub zainstalować manager wersji NodeJS np. NVM (https://github.com/nvm-sh/nvm) Oba komponenty są wieloplatformowe. W katalogu ze skryptem musi być również plik _package.json_ a w nim wpis `"type": "module"`

#

Skrypt uruchamiany jest komendą `node index`
Jeśli jest taka potrzeba można dopisać skrypt do harmonogramu systemu operacyjnego i zbierać dane w odpowiednich odstępach czasu. Ja używam od kilku lat Linux Debian więc opiszę jak to zrobić w tym systemie:

#

W terminalu wpisz `crontab -e`. Na końcu pliku dopisz jak często ma być wykonane zadanie i co ma się wykonać. Częstotliwość uruchamiania zadania opisano np tutaj (https://ai.ia.agh.edu.pl/_media/pl:dydaktyka:unix:gjn-cron.pdf) lub (http://pl.docs.pld-linux.org/uslugi_cron.html) Pomocny może być również generator CRON (https://crontab.guru/) Aby uzyskać ścieżkę do NodeJS wpisz `which node` Jeśli system nie zrobi automatycznie aliasu do skryptu sepedtest.net będziesz musiał również wiedzieć gdzie on się znajduje i wpisać go w pierwszej linijce w pliku index.js.

#

Przykładowy wpis może wyglądać tak:
`50 * * * * /home/pi/.nvm/versions/node/v16.14.0/bin/node /home/pi/net-speed/index.js`

#

Oznacza, że skrypt wykopna się za dziesięc minut każdej godziny codziennie.
