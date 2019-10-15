interface Window {
  __INITIAL_STATE__  : object
  stores: object,
  __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: any,
  returnCitySN: {
    cip: string,
    cid: string,
    cname: string
  },
  remote_ip_info: {
    province: string,
    city: string
  }
}

interface IRouter {
  path: string,
  component: new() => React.Component<any, any>,
  routes?: Array<IRouter>,
  redirect?: string,
  exact?: boolean
}

interface Action {
  type: string,
  data?: any 
}
declare module '@loadable/component'
declare module "*.svg" {
  const content: any;
  export default content;
}

declare module '*.svg'
declare module '*.png'
declare module '*.jpg'
declare module '*.jpeg'
declare module '*.gif'
declare module '*.bmp'
declare module '*.tiff'