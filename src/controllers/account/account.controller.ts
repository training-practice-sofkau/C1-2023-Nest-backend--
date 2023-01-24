import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";

@Controller("account")
export class AccountController {
    @Get()
    getAccounts(): string {
        return "Se devuelve todas las cuentas"
    }

    @Get(":id")
    getAccount(@Param("id") id: string): string {
        return "Devuelve la cuenta con id :" + id;
    }

    @Post(":id")
    createAccount(@Param("id") id: string, @Body() account: {}): string {
        return "Se crea cuenta con user id: " + id;
    }

    @Put(":id")
    modifyAccount(@Param("id") id: string, @Body() account: {}): string {
        return "Se modifica la cuenta con user id: " + id;
    }

    @Delete(":id")
    deleteAccount(@Param("id") id: string): string {
        return "Se elimina la cuenta con userID: " + id
    }
}