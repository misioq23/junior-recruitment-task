# Usage
1) Clone repo
```sh
git clone https://github.com/misioq23/junior-recruitment-task.git
```
2) Change dir
```sh
cd to-do-list
```
3) install dependencies
```sh
npm install
```
4) start express server
```sh
npm start
```

# Zadanie dla Junior Developera

Realizacja prostej listy ToDo (lista zadań do zrobienia) jako aplikacji internetowej, z wykorzystaniem HTML5 po stronie frontendu i dowolnej technologi po stronie backendu. Aplikacja umożliwia dodawanie, przeglądanie i oznaczanie jako wykonane różnych zadań.
Dla backendu możemy skorzystać z gotowego API 

lub *jako zadanie dodatkowe na plus* wykonanać prosty skrypt w API np w PHP (przykład http://henryranch.net/software/ease-into-sqlite-3-with-php-and-pdo/) lub NodeJS lub innej technice. 

## Funkcjonalność 
Aplikacja wyświetla listę zadań do wykonania. Zadania podzielone są na *wykonane* oraz *do zrobienia*. 
  - Zadania *wykonane* są przekreślone i są oznaczone kolorem (`#9eb2c0`) i zaznaczonym polem wyboru po lewej stronie.  
  - Zadania *do zrobienia* są oznaczone kolorem (`#2e3641`) i niezaznaczonym polem wyboru po lewej stronie. 
  - Pod listą zadań zawsze wyświetla się pole z możliwością dodania nowego zadania. Nowe zadanie jest zawsze *do zrobienia*
  - Po dodaniu nowego zadania, dodawane jest ono nad polem dodawana nowego zadania. Pole z możliwością dodania nowego zadania jest zawsze na samym dole listy. 
  - Nie można dodać zadania bez wpisania tytułu (walidacja powinna być i po stronie `frontend'u` i `backend'u`)
  - Każde zadanie można usunąć poprzez kliknięcie w ikonę kosza.
  - **Opcjonalnie** można zmieniać kolejność zadań poprzez przenoszenie ich *drag & drop*
  
## Frontend
Aplikacja ma przygotowany layout graficzny.

![Layout Aplikacji](https://raw.githubusercontent.com/qunabu/junior-recruitment-task/master/assets/to-do-list.png) 

  - W katalogu `assets` jest plik Photoshop `PSD` gotowy do pocięcia do szablonu. 
  - Aplikacja ma być przygotowana jak `Single Page Application`, jeden plik HTML5 wraz z jednym głównym szablonem `CSS` i jednym plikiem `JavaScript`. 
  - Komunikacja między Frontendem a Backendem ma być dokonywana w tle, bez przeładowywana strony, najlepiej z wykorzystaniem `AJAX`. 
  - Aplikacja powinna być ostylowana przez `preprocess CSS`, preferujemy `SCSS` i `compass`.  
  - Logika aplikacji powinna być podzielona według wzorca `Model-View-Controller` lub `Model-View-Whatever`.
  - Prosimy o nie korzystanie z bibliotek JavaScriptowych lub użycie minimalnej ilości. Preferujemy bibliotekę `Vanilla JS`
  - Font z którego należy korzystać to [Lato](https://www.google.com/fonts#UsePlace:use/Collection:Lato), autorstwa [Łukasza Dziedzica](http://www.lukaszdziedzic.eu/) w wersji Normal i Bold. Prosimy o skorzystanie z wersji [Google Fonts](https://www.google.com/fonts#UsePlace:use/Collection:Lato).
  
## Backend gotowy 
  - API nie ma dokumentacji ale jest napisane wg specyfikacji REST. Wszystkie zapytania i odpowiedzi są wysyłane w formacie JSON, jeżeli nie ma błedu kod odpowiedzi to 200, jeżeli jest błąd to 400 i tablica z błędami. Wszystkie rekordu są kasowane raz dziennie. 
  - endpoint https://qunabu.com/api/todos 
  > - GET zwraca wszystkie todos, 
  > - POST tworzy nowy i zwraca jego ID
  - endpoint https://qunabu.com/api/todo/ID gdzie ID to identyfikator rekordu Todo 
  > - GET zwraca rekord
  > - DELETE usuwa rekord 
  > - PATCH zmienia rekord 
  > - struktura rekordu Todo jest następująca 
  
```
class Todo  {
  static $db = array(
    'Content'=>'Text',
    'Finished'=>'Boolean',
    'Sort'=>'Int'
  );
  static $default_sort = 'Sort';
}
```
## Backend (opcjonalnie)
  - Należy stworzyć skrypt który utworzy bazę danych `SQLite` lub inną oraz jej strukturę.
  - Należy stworzyć plik do którego będzie odwoływał się frontend który będzie wykonywał `CRUD` (create, read, update and delete) dla zadań ToDo. 
  - Nie będzie obsługi użytkowników oraz uwierzytelniania - każda osoba ma dostęp do tworzenia, czytania, aktualizacji i usuwania.
  - Powyższa opcja jest opcjonalna, można skorzystać z publicznego API - np https://todo-simple-api.herokuapp.com/ (pod tym linkiem jest dokumentacja, REST Endpoint - https://todo-simple-api.herokuapp.com/todos)
  
  
## Zdanie do wykonania 
  - Na swoim koncie github zrobić `fork` poniższego repozytorium.
  - Wykonać aplikację aby po wgraniu jej do katalogu była dostępna z katalogu `to-do-list` np `http://localhost/to-do-list`.
  - `Frontend` ma być dostępny w katalogu `to-do-list/frontend` np `http://localhost/to-do-list/frontend`.
  - *opcjonalnie* `Backend` ma być dostępny w katalogu `to-do-list/backend` np `http://localhost/to-do-list/backend`. Można skorzystać z https://todo-simple-api.herokuapp.com/
  - Kod ma być **czytelny i opisany** przez komentarze, JavaScript zgodnie z [documentationjs](https://github.com/documentationjs/documentation/blob/master/docs/GETTING_STARTED.md), PHP zgodnie z [phpdoc](https://www.phpdoc.org/docs/latest/getting-started/your-first-set-of-documentation.html) a inne języki zgodnie z wybraną specyfikacją.
  - Aplikację zostawiamy w wersji developerskiej, nie minifikujemy plików, nie kompresujemy nie łączymy ich, etc.
  - Proszę o dołączenie instrukcji w jaki sposób należy uruchomić aplikację. 
  
## Powodzenia

### Copyrights

Projekt graficzny jest przerobioną wersja [To Do List (PSD)](https://www.behance.net/gallery/10852567/To-Do-List-(PSD)) autorska [Marijan Petrovski](https://www.behance.net/psdchat).

Zadanie jest rozpowszechniane na licencji [MIT](https://opensource.org/licenses/MIT).
