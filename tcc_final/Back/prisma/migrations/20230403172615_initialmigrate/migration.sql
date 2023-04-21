-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "enrollDate" DATETIME NOT NULL,
    "birthDate" DATETIME NOT NULL,
    "isRh" BOOLEAN NOT NULL DEFAULT false,
    "cpf" TEXT NOT NULL,
    "phone" INTEGER NOT NULL,
    "state" TEXT NOT NULL,
    "city" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Holerite" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "currentMonth" TEXT NOT NULL,
    "bruteSalary" REAL NOT NULL,
    "inssValue" REAL NOT NULL,
    "foodValue" REAL NOT NULL,
    "healthyValue" REAL NOT NULL,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "Holerite_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
