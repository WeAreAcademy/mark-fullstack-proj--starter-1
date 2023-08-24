//This is an example of how to extend Express's Request interface.
//E.g. perhaps you want to give some / all requests a requestId property
//(The actual values might be set using some middleware, elsewhere.)

//Missing types under ts-node / ts-node-dev?
//See https://typestrong.org/ts-node/docs/troubleshooting#missing-types

//Make this a module
export {};

declare global {
    namespace Express {
        // These open interfaces may be extended in an application-specific manner via declaration merging,
        //as stated here: https://github.com/DefinitelyTyped/DefinitelyTyped/blob/12ceeef6ff63cbe744a4e6ade6ed7cf6cde15234/types/express-serve-static-core/index.d.ts#L18-L19
        //
        interface Request {
            requestId?: string;
        }
    }
}
