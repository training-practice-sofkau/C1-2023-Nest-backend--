import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post, Put } from "@nestjs/common";
import { NewAccountDTO } from "src/dtos/account/new-account.dto";
import { AccountEntity } from "src/persistence/entities";
import { AccountService } from "src/services";

@Controller("account")
export class AccountController {

    constructor(private readonly accountServices: AccountService) { }
    @Get()
    getAccounts(): AccountEntity[] {
        return "Se devuelve todas las cuentas"
    }

    @Get(":id")
    getAccount(@Param("id", new ParseUUIDPipe()) id: string): AccountEntity {
        return "Devuelve la cuenta con id :" + id;
    }

    @Post(":id")
    createAccount(@Param("id", new ParseUUIDPipe()) id: string, @Body() account: NewAccountDTO): AccountEntity {
        return "Se crea cuenta con user id: " + id;
    }

    @Put(":id")
    modifyAccount(@Param("id", new ParseUUIDPipe()) id: string, @Body() account: NewAccountDTO): AccountEntity {
        return "Se modifica la cuenta con user id: " + id;
    }

    @Delete(":id")
    deleteAccount(@Param("id", new ParseUUIDPipe()) id: string): void {
    }
}