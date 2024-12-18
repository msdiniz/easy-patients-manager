import readline from 'readline';

describe('Console Input Test', () => {
  it('should receive console input', async () => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    const input = await new Promise<string>((resolve) => {
      rl.question('Enter this input: testing', (answer) => {
        rl.close();
        resolve(answer);
      });
    });

    console.log('Received input:', input);
    expect(input).toBeDefined();
    expect(input).toBe('testing'); // Replace 'test input' with the expected input for the test
  }, 300000); // Increase the timeout to 5 minutes (300000 ms)
});