export interface AuthInterface {
  uniqUsername({ username }: { username: string }): Promise<unknown>;
  signup({ user }: { user: unknown });
  login(arg: unknown): any;
}
