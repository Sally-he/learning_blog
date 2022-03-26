type diff<o, o1> = {
    [k in keyof Omit<o, keyof o>]: o1[k];
}