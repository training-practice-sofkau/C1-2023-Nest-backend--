import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { AccountTp } from "src/dtos/accounttp/create-accounttp.dto";

@Controller("accounttp")
export class AccountTpController {

    @Get(":id")
    getAccountTp(@Param("AccountID") id: string): string {
        return "Se devuelve el tipo de cuenta de AccountID: " + id
    }

    @Post()
    createAccountTp(@Body() accounttp: AccountTp): string {
        return "Se crea el tipo de cuenta"
    }

    @Put(":AccountID")
    modifyAccountTp(@Param("AccountID") id: string, @Body() accounttp: AccountTp): string {
        return "Se modifica la informacion de la cuenta " + id
    }

    @Delete(":AccountID")
    delelteAccountType(@Param("AccountID") id: string): string {
        return "Borra la cuenta con AccountID: " + id
    }
}
