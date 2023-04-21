-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "enrollDate" DATETIME NOT NULL,
    "birthDate" DATETIME NOT NULL,
    "isRh" BOOLEAN NOT NULL DEFAULT false,
    "cpf" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "city" TEXT NOT NULL
);
INSERT INTO "new_User" ("birthDate", "city", "cpf", "enrollDate", "firstName", "id", "isRh", "lastName", "password", "phone", "state") SELECT "birthDate", "city", "cpf", "enrollDate", "firstName", "id", "isRh", "lastName", "password", "phone", "state" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
