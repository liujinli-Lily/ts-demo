import { RouteConfig } from 'vue-router';

// @ts-ignore
export interface MenuRoute extends RouteConfig{
    icon?: string;
    path: string;
}
