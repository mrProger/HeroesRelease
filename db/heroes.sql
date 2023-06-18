CREATE TABLE IF NOT EXISTS `users` (
    id INTEGER PRIMARY KEY,
    login TEXT,
    password TEXT,
    email TEXT,
    fraction TEXT,
    level INTEGER,
    money INTEGER,
    donate_money INTEGER,
    win_count INTEGER,
    exp INTEGER,
    health INTEGER,
    defense INTEGER,
    power INTEGER,
    staff1_buyed BOOLEAN,
    staff2_buyed BOOLEAN,
    staff3_buyed BOOLEAN,
    crystal1_buyed BOOLEAN,
    crystal2_buyed BOOLEAN,
    crystal3_buyed BOOLEAN,
    crystal4_buyed BOOLEAN,
    crystal5_buyed BOOLEAN,
    crystal6_buyed BOOLEAN,
    staff1_used TEXT,
    staff2_used TEXT,
    crystal1_used TEXT,
    crystal2_used TEXT,
    is_admin BOOLEAN
);

CREATE TABLE IF NOT EXISTS `feedbacks` (
    id INTEGER PRIMARY KEY,
    login TEXT,
    email TEXT,
    theme TEXT,
    message TEXT
);

CREATE TABLE IF NOT EXISTS `news` (
    id INTEGER PRIMARY KEY,
    title TEXT,
    body TEXT,
    image TEXT
);

CREATE TABLE IF NOT EXISTS `items` (
    id INTEGER PRIMARY KEY,
    name TEXT,
    price INTEGER,
    money_type TEXT,
    image TEXT
);