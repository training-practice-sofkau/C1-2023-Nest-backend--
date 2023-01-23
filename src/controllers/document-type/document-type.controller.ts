import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { DocumentTypeDTO } from "src/dtos/document-type/document-type.dto";

@Controller("doc-type")
export class DocumentTypeController {
    @Get()
    getDocuments(): string {
        return "Devuelve todos los documentos"
    }
    @Get(":id")
    getDocument(@Param("id") id: string): string {
        return "Devuelve el documento con ID: " + id
    }

    @Post(":id")
    createDocumentType(@Param("id") id: string, @Body() data: DocumentTypeDTO): string {
        return "Crea el documento tipo"
    }

    @Put(":id")
    modifyDocumentType(@Param("id") id: string, @Body() data: DocumentTypeDTO): string {
        return "Modifica el documento con ID: " + id
    }

    @Delete(":id")
    deleteDocumentType(@Param("id") id: string): string {
        return "Elimina el documento con ID: " + id
    }
}