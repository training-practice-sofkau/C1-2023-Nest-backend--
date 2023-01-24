import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';

@Controller("user")
export class UserController {

    @Get()
    getUsers() {
        return "Devuelve todos los usuarios"
    }

    @Get(":id")
    getUser(@Param("id") id: string): string {
        return "Devuelve un usuario con id " + id
    }

    @Post()
    createUser(@Body() user: { name: string }): string {
        return "Se crea Usuario con: " + user.name
    }

    @Put(":id")
    modifyUser(@Param("id") id: string, @Body() user: {}): string {
        return "Se modifica el usuario " + id;
    }

    @Delete(":id")
    deleteUser(@Param("id") id: string) {
        return "Se borra el usuario " + id
    }

}