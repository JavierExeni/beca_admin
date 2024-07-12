export  type NavMenu = {
  category  : string;
  childrens : NavOption[];
}

export type NavOption = {
  option      : string;
  route       : string;
  icon        : string;
  visible     : boolean;
  hasChildrens: boolean;
  childrens   : NavOption[] | null;
}
