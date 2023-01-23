import { Module } from "@nestjs/common";
import { AccountTpController } from "src/controllers/accounttp/accounttp.controller";
import { AccounTpService } from "src/services/accounttp/accounttp.service";

@Module({
    controllers:[AccountTpController],
    providers:[AccounTpService]
})

export class AccountTpModule{}