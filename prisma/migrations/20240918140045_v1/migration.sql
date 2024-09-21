-- CreateTable
CREATE TABLE `file` (
    `uuid` VARCHAR(191) NOT NULL,
    `src` VARCHAR(191) NOT NULL,
    `provider` VARCHAR(191) NOT NULL,
    `type` VARCHAR(191) NOT NULL,
    `size` VARCHAR(191) NULL,
    `alt` VARCHAR(191) NULL,
    `isDeleted` BOOLEAN NOT NULL DEFAULT false,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `voteOptionsId` VARCHAR(191) NULL,

    UNIQUE INDEX `file_uuid_key`(`uuid`),
    PRIMARY KEY (`uuid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `department` (
    `uuid` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `department_uuid_key`(`uuid`),
    PRIMARY KEY (`uuid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user` (
    `uuid` VARCHAR(191) NOT NULL,
    `matricNo` VARCHAR(191) NULL,
    `firstName` VARCHAR(191) NOT NULL,
    `middleName` VARCHAR(191) NULL,
    `email` VARCHAR(191) NULL,
    `phone` VARCHAR(191) NULL,
    `lastName` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `role` ENUM('student', 'lecturer', 'admin') NOT NULL DEFAULT 'student',
    `isVerified` BOOLEAN NOT NULL DEFAULT false,
    `isSuspended` BOOLEAN NOT NULL DEFAULT false,
    `isBanned` BOOLEAN NOT NULL DEFAULT false,
    `fileId` VARCHAR(191) NULL,
    `departmentId` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `key` JSON NULL,
    `auth` JSON NULL,

    UNIQUE INDEX `user_uuid_key`(`uuid`),
    UNIQUE INDEX `user_email_key`(`email`),
    PRIMARY KEY (`uuid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `voteOptions` (
    `uuid` VARCHAR(191) NOT NULL,
    `votesId` VARCHAR(191) NOT NULL,
    `text` VARCHAR(191) NULL,
    `userId` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `voteOptions_uuid_key`(`uuid`),
    PRIMARY KEY (`uuid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `currentVotes` (
    `uuid` VARCHAR(191) NOT NULL,
    `votesId` VARCHAR(191) NULL,
    `userId` VARCHAR(191) NOT NULL,
    `voteOptionsId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `currentVotes_uuid_key`(`uuid`),
    PRIMARY KEY (`uuid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `votes` (
    `uuid` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `description` TEXT NULL,
    `visibility` ENUM('public', 'private') NOT NULL DEFAULT 'public',
    `whoCanView` ENUM('everyone') NOT NULL DEFAULT 'everyone',
    `fileId` VARCHAR(191) NULL,
    `userId` VARCHAR(191) NOT NULL,
    `startDate` DATETIME(3) NOT NULL,
    `endDate` DATETIME(3) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `votes_uuid_key`(`uuid`),
    PRIMARY KEY (`uuid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `file` ADD CONSTRAINT `file_voteOptionsId_fkey` FOREIGN KEY (`voteOptionsId`) REFERENCES `voteOptions`(`uuid`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user` ADD CONSTRAINT `user_fileId_fkey` FOREIGN KEY (`fileId`) REFERENCES `file`(`uuid`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user` ADD CONSTRAINT `user_departmentId_fkey` FOREIGN KEY (`departmentId`) REFERENCES `department`(`uuid`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `voteOptions` ADD CONSTRAINT `voteOptions_votesId_fkey` FOREIGN KEY (`votesId`) REFERENCES `votes`(`uuid`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `voteOptions` ADD CONSTRAINT `voteOptions_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user`(`uuid`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `currentVotes` ADD CONSTRAINT `currentVotes_voteOptionsId_fkey` FOREIGN KEY (`voteOptionsId`) REFERENCES `voteOptions`(`uuid`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `currentVotes` ADD CONSTRAINT `currentVotes_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user`(`uuid`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `currentVotes` ADD CONSTRAINT `currentVotes_votesId_fkey` FOREIGN KEY (`votesId`) REFERENCES `votes`(`uuid`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `votes` ADD CONSTRAINT `votes_fileId_fkey` FOREIGN KEY (`fileId`) REFERENCES `file`(`uuid`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `votes` ADD CONSTRAINT `votes_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user`(`uuid`) ON DELETE RESTRICT ON UPDATE CASCADE;
