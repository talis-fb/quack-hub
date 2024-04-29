import { HttpException, HttpStatus } from "@nestjs/common";
import { ServiceException } from "src/common/exceptions/ServiceException";

export class NotFoundException extends ServiceException {
    public message: string | undefined;
    public defaultResourceName: string = "Recurso";

    toHttp(): HttpException {
        const message = this.message || `${this.defaultResourceName} não encontrado`;
        return new HttpException(message, HttpStatus.NOT_FOUND);
    }
}
