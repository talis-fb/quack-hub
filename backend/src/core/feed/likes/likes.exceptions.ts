import { HttpException, HttpStatus } from "@nestjs/common";
import { ServiceException } from "src/common/exceptions/ServiceException";

export class LikeAlreadyGivenException extends ServiceException {
    toHttp(): HttpException {
        return new HttpException('Like ja realizado no post', HttpStatus.BAD_REQUEST);       
    }
}