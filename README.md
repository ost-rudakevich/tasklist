//Бекенд(Laravel)
cd backend
cp .env.example .env
composer install
php artisan key:generate
php artisan
php artisan serve

//Фронтенд(React)
cd frontend
npm install
npm run dev
