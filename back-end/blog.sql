Drop DATABASE blog;
CREATE DATABASE blog;
USE blog;
CREATE TABLE IF NOT EXISTS `users`(
    `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    `userName` VARCHAR(10),
    `countName` VARCHAR(20) NOT NULL,
    `password` VARCHAR(20) NOT NULL,
    `createTime` char(13) NOT NULL
)ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO users(userName, countName, password, createTime) VALUES("admin", "a804862153", "woaini19990329", "1596958860001");

CREATE TABLE IF NOT EXISTS `essay`(
    `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    `authorId` INT UNSIGNED,
    `tagName` varchar(15) NOT NULL,
    `title` varchar(20) NOT NULL,
    `content` TEXT NOT NULL,
    `createTime` char(13) NOT NULL,
    `updateTime` char(13) NOT NULL,
    `viewCount` INT DEFAULT 0,
    FOREIGN KEY(`authorId`) REFERENCES users(`id`)
)ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO essay(authorId, tagName, title, content, createTime, updateTime) VALUES
    ((SELECT id FROM users WHERE userName = "admin"), "MySQL", "如何学习MySql？", "``` let a = 1; ```# 学习MySql是一个漫长的过程, 学习MySql是一个漫长的过程, 学习MySql是一个漫长的过程, 学习MySql是一个漫长的过程, 学习MySql是一个漫长的过程, 学习MySql是一个漫长的过程学习MySql是一个漫长的过程, 学习MySql是一个漫长的过程, 学习MySql是一个漫长的过程, 学习MySql是一个漫长的过程, 学习MySql是一个漫长的过程, 学习MySql是一个漫长的过程学习MySql是一个漫长的过程, 学习MySql是一个漫长的过程, 学习MySql是一个漫长的过程, 学习MySql是一个漫长的过程, 学习MySql是一个漫长的过程, 学习MySql是一个漫长的过程", "1596958861036", "1596958861036"),
    ((SELECT id FROM users WHERE userName = "admin"), "MySQL", "如何学习MySql？t2", "``` let a = 1; ```# 学习MySql是一个漫长的过程, 学习MySql是一个漫长的过程, 学习MySql是一个漫长的过程, 学习MySql是一个漫长的过程, 学习MySql是一个漫长的过程, 学习MySql是一个漫长的过程学习MySql是一个漫长的过程, 学习MySql是一个漫长的过程, 学习MySql是一个漫长的过程, 学习MySql是一个漫长的过程, 学习MySql是一个漫长的过程, 学习MySql是一个漫长的过程学习MySql是一个漫长的过程, 学习MySql是一个漫长的过程, 学习MySql是一个漫长的过程, 学习MySql是一个漫长的过程, 学习MySql是一个漫长的过程, 学习MySql是一个漫长的过程", "1596958861040", "1596958861040"),
    ((SELECT id FROM users WHERE userName = "admin"), "MySQL", "如何学习MySql？t3", "``` let a = 1; ```# 学习MySql是一个漫长的过程, 学习MySql是一个漫长的过程, 学习MySql是一个漫长的过程, 学习MySql是一个漫长的过程, 学习MySql是一个漫长的过程, 学习MySql是一个漫长的过程学习MySql是一个漫长的过程, 学习MySql是一个漫长的过程, 学习MySql是一个漫长的过程, 学习MySql是一个漫长的过程, 学习MySql是一个漫长的过程, 学习MySql是一个漫长的过程学习MySql是一个漫长的过程, 学习MySql是一个漫长的过程, 学习MySql是一个漫长的过程, 学习MySql是一个漫长的过程, 学习MySql是一个漫长的过程, 学习MySql是一个漫长的过程", "1596958861050", "1596958861050"),
    ((SELECT id FROM users WHERE userName = "admin"), "MySQL", "如何学习MySql？t4", "``` let a = 1; ```# 学习MySql是一个漫长的过程, 学习MySql是一个漫长的过程, 学习MySql是一个漫长的过程, 学习MySql是一个漫长的过程, 学习MySql是一个漫长的过程, 学习MySql是一个漫长的过程学习MySql是一个漫长的过程, 学习MySql是一个漫长的过程, 学习MySql是一个漫长的过程, 学习MySql是一个漫长的过程, 学习MySql是一个漫长的过程, 学习MySql是一个漫长的过程学习MySql是一个漫长的过程, 学习MySql是一个漫长的过程, 学习MySql是一个漫长的过程, 学习MySql是一个漫长的过程, 学习MySql是一个漫长的过程, 学习MySql是一个漫长的过程", "1596958861060", "1596958861060"),
    ((SELECT id FROM users WHERE userName = "admin"), "MySQL", "如何学习MySql？t5", "``` let a = 1; ```# 学习MySql是一个漫长的过程, 学习MySql是一个漫长的过程, 学习MySql是一个漫长的过程, 学习MySql是一个漫长的过程, 学习MySql是一个漫长的过程, 学习MySql是一个漫长的过程学习MySql是一个漫长的过程, 学习MySql是一个漫长的过程, 学习MySql是一个漫长的过程, 学习MySql是一个漫长的过程, 学习MySql是一个漫长的过程, 学习MySql是一个漫长的过程学习MySql是一个漫长的过程, 学习MySql是一个漫长的过程, 学习MySql是一个漫长的过程, 学习MySql是一个漫长的过程, 学习MySql是一个漫长的过程, 学习MySql是一个漫长的过程", "1596958861070", "1596958861070"),
    ((SELECT id FROM users WHERE userName = "admin"), "MySQL", "如何学习MySql？t6", "``` let a = 1; ```# 学习MySql是一个漫长的过程, 学习MySql是一个漫长的过程, 学习MySql是一个漫长的过程, 学习MySql是一个漫长的过程, 学习MySql是一个漫长的过程, 学习MySql是一个漫长的过程学习MySql是一个漫长的过程, 学习MySql是一个漫长的过程, 学习MySql是一个漫长的过程, 学习MySql是一个漫长的过程, 学习MySql是一个漫长的过程, 学习MySql是一个漫长的过程学习MySql是一个漫长的过程, 学习MySql是一个漫长的过程, 学习MySql是一个漫长的过程, 学习MySql是一个漫长的过程, 学习MySql是一个漫长的过程, 学习MySql是一个漫长的过程", "1596958861080", "1596958861080"),
    ((SELECT id FROM users WHERE userName = "admin"), "MySQL", "如何学习MySql？t7", "``` let a = 1; ```# 学习MySql是一个漫长的过程, 学习MySql是一个漫长的过程, 学习MySql是一个漫长的过程, 学习MySql是一个漫长的过程, 学习MySql是一个漫长的过程, 学习MySql是一个漫长的过程学习MySql是一个漫长的过程, 学习MySql是一个漫长的过程, 学习MySql是一个漫长的过程, 学习MySql是一个漫长的过程, 学习MySql是一个漫长的过程, 学习MySql是一个漫长的过程学习MySql是一个漫长的过程, 学习MySql是一个漫长的过程, 学习MySql是一个漫长的过程, 学习MySql是一个漫长的过程, 学习MySql是一个漫长的过程, 学习MySql是一个漫长的过程", "1596958861090", "1596958861090"),
    ((SELECT id FROM users WHERE userName = "admin"), "MySQL", "如何学习MySql？t8", "``` let a = 1; ```# 学习MySql是一个漫长的过程, 学习MySql是一个漫长的过程, 学习MySql是一个漫长的过程, 学习MySql是一个漫长的过程, 学习MySql是一个漫长的过程, 学习MySql是一个漫长的过程学习MySql是一个漫长的过程, 学习MySql是一个漫长的过程, 学习MySql是一个漫长的过程, 学习MySql是一个漫长的过程, 学习MySql是一个漫长的过程, 学习MySql是一个漫长的过程学习MySql是一个漫长的过程, 学习MySql是一个漫长的过程, 学习MySql是一个漫长的过程, 学习MySql是一个漫长的过程, 学习MySql是一个漫长的过程, 学习MySql是一个漫长的过程", "1596958861100", "1596958861100"),
    ((SELECT id FROM users WHERE userName = "admin"), "MySQL", "如何学习MySql？t9", "``` let a = 1; ```# 学习MySql是一个漫长的过程, 学习MySql是一个漫长的过程, 学习MySql是一个漫长的过程, 学习MySql是一个漫长的过程, 学习MySql是一个漫长的过程, 学习MySql是一个漫长的过程学习MySql是一个漫长的过程, 学习MySql是一个漫长的过程, 学习MySql是一个漫长的过程, 学习MySql是一个漫长的过程, 学习MySql是一个漫长的过程, 学习MySql是一个漫长的过程学习MySql是一个漫长的过程, 学习MySql是一个漫长的过程, 学习MySql是一个漫长的过程, 学习MySql是一个漫长的过程, 学习MySql是一个漫长的过程, 学习MySql是一个漫长的过程", "1596958861110", "1596958861110"),
    ((SELECT id FROM users WHERE userName = "admin"), "MySQL", "如何学习MySql？t10", "``` let a = 1; ```# 学习MySql是一个漫长的过程, 学习MySql是一个漫长的过程, 学习MySql是一个漫长的过程, 学习MySql是一个漫长的过程, 学习MySql是一个漫长的过程, 学习MySql是一个漫长的过程学习MySql是一个漫长的过程, 学习MySql是一个漫长的过程, 学习MySql是一个漫长的过程, 学习MySql是一个漫长的过程, 学习MySql是一个漫长的过程, 学习MySql是一个漫长的过程学习MySql是一个漫长的过程, 学习MySql是一个漫长的过程, 学习MySql是一个漫长的过程, 学习MySql是一个漫长的过程, 学习MySql是一个漫长的过程, 学习MySql是一个漫长的过程", "1596958861120", "1596958861120"),
    ((SELECT id FROM users WHERE userName = "admin"), "MySQL", "如何学习MySql？t11", "``` let a = 1; ```# 学习MySql是一个漫长的过程, 学习MySql是一个漫长的过程, 学习MySql是一个漫长的过程, 学习MySql是一个漫长的过程, 学习MySql是一个漫长的过程, 学习MySql是一个漫长的过程学习MySql是一个漫长的过程, 学习MySql是一个漫长的过程, 学习MySql是一个漫长的过程, 学习MySql是一个漫长的过程, 学习MySql是一个漫长的过程, 学习MySql是一个漫长的过程学习MySql是一个漫长的过程, 学习MySql是一个漫长的过程, 学习MySql是一个漫长的过程, 学习MySql是一个漫长的过程, 学习MySql是一个漫长的过程, 学习MySql是一个漫长的过程", "1596958861130", "1596958861130"),
    ((SELECT id FROM users WHERE userName = "admin"), "MySQL2", "如何学习MySql（一）？", "# 学习MySql是一个漫长的过程, 学习MySql是一个漫长的过程, 学习MySql是一个漫长的过程, 学习MySql是一个漫长的过程, 学习MySql是一个漫长的过程, 学习MySql是一个漫长的过程学习MySql是一个漫长的过程, 学习MySql是一个漫长的过程, 学习MySql是一个漫长的过程, 学习MySql是一个漫长的过程, 学习MySql是一个漫长的过程, 学习MySql是一个漫长的过程学习MySql是一个漫长的过程, 学习MySql是一个漫长的过程, 学习MySql是一个漫长的过程, 学习MySql是一个漫长的过程, 学习MySql是一个漫长的过程, 学习MySql是一个漫长的过程1", "1596958861140", "1596958861140"),
    ((SELECT id FROM users WHERE userName = "admin"), "MySQL3", "如何学习MySql？（二）", "# 学习MySql是一个漫长的过程, 学习MySql是一个漫长的过程, 学习MySql是一个漫长的过程, 学习MySql是一个漫长的过程, 学习MySql是一个漫长的过程, 学习MySql是一个漫长的过程学习MySql是一个漫长的过程, 学习MySql是一个漫长的过程, 学习MySql是一个漫长的过程, 学习MySql是一个漫长的过程, 学习MySql是一个漫长的过程, 学习MySql是一个漫长的过程学习MySql是一个漫长的过程, 学习MySql是一个漫长的过程, 学习MySql是一个漫长的过程, 学习MySql是一个漫长的过程, 学习MySql是一个漫长的过程, 学习MySql是一个漫长的过程2", "1596958861150", "1596958861150"),
    ((SELECT id FROM users WHERE userName = "admin"), "MySQL4", "如何学习MySql？（三）", "# 学习MySql是一个漫长的过程, 学习MySql是一个漫长的过程, 学习MySql是一个漫长的过程, 学习MySql是一个漫长的过程, 学习MySql是一个漫长的过程, 学习MySql是一个漫长的过程学习MySql是一个漫长的过程, 学习MySql是一个漫长的过程, 学习MySql是一个漫长的过程, 学习MySql是一个漫长的过程, 学习MySql是一个漫长的过程, 学习MySql是一个漫长的过程学习MySql是一个漫长的过程, 学习MySql是一个漫长的过程, 学习MySql是一个漫长的过程, 学习MySql是一个漫长的过程, 学习MySql是一个漫长的过程, 学习MySql是一个漫长的过程3", "1596958861160", "1596958861160")
;

CREATE TABLE IF NOT EXISTS `friendlyLinks`(
    `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    `tagName` VARCHAR(20) NOT NULL,
    `name` VARCHAR(20) NOT NULL,
    `path` VARCHAR(50) NOT NULL
)ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO friendlyLinks(tagName, name, path) VALUES
    ("前端大牛", "前端小武的博客", "https://xuexb.com/"),
    ("前端大牛", "前端小武的博客2", "https://xuexb1.com/"),
    ("前端大牛", "前端小武的博客3", "https://xuexb2.com/"),
    ("前端大牛", "前端小武的博客4", "https://xuexb3.com/"),
    ("前端大牛2", "前端小武的博客", "https://xuexb.com/"),
    ("前端大牛2", "前端小武的博客2", "https://xuexb1.com/"),
    ("前端大牛2", "前端小武的博客3", "https://xuexb2.com/"),
    ("前端大牛2", "前端小武的博客4", "https://xuexb3.com/"),
    ("前端大牛2", "前端小武的博客", "https://xuexb.com/"),
    ("前端大牛3", "前端小武的博客2", "https://xuexb1.com/"),
    ("前端大牛3", "前端小武的博客3", "https://xuexb2.com/"),
    ("前端大牛3", "前端小武的博客4", "https://xuexb3.com/")
;

CREATE TABLE `hotKeywords`(
    `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    `keyword` VARCHAR(100) NOT NULL,
    `searchCount` INT NOT NULL DEFAULT 1
)ENGINE=InnoDB DEFAULT CHARSET=utf8;