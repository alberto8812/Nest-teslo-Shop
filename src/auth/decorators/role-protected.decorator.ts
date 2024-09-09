import { SetMetadata } from '@nestjs/common';
import { ValidRoles } from '../interface';

export const META_ROLES='roles';//es la plabra

export const RoleProtected = (...args: ValidRoles[]) => {

    return SetMetadata(META_ROLES, args);// usamos la plabra aqui
};
