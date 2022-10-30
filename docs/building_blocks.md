# Main building blocks

1. Exception Filters

- Responsible for handle and processing unhandled exceptions that might occur;
- Control the exact flow or specific responses for each exception type.

2. Pipes

- Useful to handle transformations: transform input data to the desired output;
- Useful to handle validation: meaning to valuate an input data into a valid, or throw an exception.

3. Guards

- Determine whether a given request meets certain conditions, like authentication, authorization, roles ACLs, etc.
- If the conditions are met, requests are allowed

4. Interceptors
   > Many useful capabilities, inspired by the aspect oriented programming techniques.

- bind extra logic, before or after method execution
- transform the result returned from a method
- extend basic method behavior
- completely override a method depending on specific conditions, like caching reponses

---

# Binding techniques

- Global scoped
- Controller scoped
- Method scoped
- Param scoped
