import { HttpException, HttpStatus } from "@nestjs/common";
import { ServiceException } from "src/common/exceptions/ServiceException";
import { NotFoundException } from "src/common/exceptions/collection/ResourceNotFound.exception";

export class LikeAlreadyGivenException extends ServiceException {
    toHttp(): HttpException {
        return new HttpException('Like ja realizado no post', HttpStatus.BAD_REQUEST);       
    }
}

export class LikeNotFoundException extends NotFoundException {
    public resourceName = "Like";
}