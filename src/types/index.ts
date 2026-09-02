export interface NavItem {
  label: string;
  href: string;
  external?: boolean;
}

export interface SiteConfig {
  name: string;
  description: string;
  url: string;
}

export interface Feature {
  title: string;
  description: string;
  /** Lucide icon name key defined in the consuming component. */
  icon: "zap" | "shield" | "layers" | "code";
}
