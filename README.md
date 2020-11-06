# ActiveWithFriends

## Instructions for pushing code
1. Switch to main branch 
    
    ```git checkout main```
2. Make sure your branch is up to date with main

    ```git pull origin main```
3. Make sure you have installed all dependencies

    ```npm install```
    
    (If adding a new package, use ```npm install <package_name> --save-prod```)
    
4. Add your changes

    ```git add .```
5. Commit your changes, choose a meaningful title and description of your commit

    ```git commit```
    
    Example:
    
        Commit title
        Description of my commit
6. Push your changes to your remote branch

    ```git push origin my_branch```
7. After pushing, check your branch on Github and create a pull request
8. Ask someone to review your code
9. After someone approves your PR (pull request), merge your branch to main and wait for
it to pass through the CI/CD pipeline (check the environments link for deployment)
10. Verify your changes on the live website, and you're done!