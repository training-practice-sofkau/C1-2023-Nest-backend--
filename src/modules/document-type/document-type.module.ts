import { Module } from "@nestjs/common";
import { DocumentTypeController } from "src/controllers/document-type/document-type.controller";
import { DocumentTypeService } from "src/services/document-type/document-type.service";

@Module({
    controllers: [DocumentTypeController],
    providers: [DocumentTypeService]
})
export class DocumentTypeModule { }