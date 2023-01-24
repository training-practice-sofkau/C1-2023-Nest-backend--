import { Module } from "@nestjs/common";
import { AccountController } from "src/controllers/account/account.controller";
import { AccountService } from "src/services";

@Module({
    controllers: [AccountController],
    providers: [AccountService]
})

export class AccountModule { }