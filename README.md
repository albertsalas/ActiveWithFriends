# ActiveWithFriends

## Instructions for pushing code
1. Switch to main branch 
    
    ```git checkout main```
2. Make sure your main branch is up to date

    ```git pull```
3. Make sure you have installed all dependencies

    ```npm install```
4. Checkout to your branch

    ```git checkout my_branch```
    
    If it doesn't exist, then use the ```-b``` option to create a new one
5. Add your changes

    ```git add .```
6. Commit your changes, choose a meaningful title and description of your commit

    ```git commit```
    
    Example:
    
        Commit title
        Description of my commit
7. Push your changes to your remote branch

    ```git push origin my_branch```
8. After pushing, check your branch on Github and create a pull request
9. Ask someone to review your code
10. After someone approves your PR (pull request), merge your branch to main and wait for
it to pass through the CI/CD pipeline (check the environments link for deployment)
11. Verify your changes on the live website, and you're done!