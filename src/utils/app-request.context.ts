import { RequestContext } from '@medibloc/nestjs-request-context';

export class AppRequestContext extends RequestContext {
  locale: string;
}
