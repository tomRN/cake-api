export const getEndpointURLForCurrentEnv = () => {
    if (process.env.STAGE === 'prod') return 'Prod not deployed yet, service still in beta';
    if (process.env.STAGE === 'dev') {
        if (process.env.TEST_LOCAL) return "http://localhost:4040/dev"
        return "https://muk48t5ptj.execute-api.eu-west-2.amazonaws.com/dev"
    }
    throw new Error("Did not recognize stage");
}