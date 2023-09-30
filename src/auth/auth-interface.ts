export interface AuthInterface {
  signup({ user }: { user: unknown });
  login(arg: unknown): any;
}
