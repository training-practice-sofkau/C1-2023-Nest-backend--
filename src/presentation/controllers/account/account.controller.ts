import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post, Put } from "@nestjs/common";
import { AccountEntity } from "src/business/persistence";
import { AccountService, NewAccountDTO } from "src/data";

@Controller("account")
export class AccountController {

    constructor(private readonly accountServices: AccountService) { }
    @Get()
    getAccounts(): AccountEntity[] {
        return this.accountServices.findAll()
    }

    @Get(":id")
    getAccount(@Param("id", new ParseUUIDPipe()) id: string): AccountEntity {
        return this.accountServices.findOneById(id)
    }

    @Post()
    createAccount(@Body() account: NewAccountDTO): AccountEntity {
        return this.accountServices.createAccount(account)
    }

    @Put(":id")
    modifyAccount(@Param("id", new ParseUUIDPipe()) id: string, @Body() account: NewAccountDTO): AccountEntity {
        return this.accountServices.updateAccount(id, account)
    }

    @Delete(":id")
    deleteAccount(@Param("id", new ParseUUIDPipe()) id: string): void {
        return this.accountServices.deleteAccount(id)
    }
}