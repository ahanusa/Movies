# Movies

Links to setup and deploy .NET Core app on Linux

https://docs.microsoft.com/en-us/aspnet/core/publishing/linuxproduction?tabs=aspnetcore2x
http://blog.bobbyallen.me/2017/05/01/deploying-and-hosting-asp-net-core-applications-on-ubuntu-linux/
https://rehansaeed.com/nginx-asp-net-core-depth/

## Movies API
https://www.themoviedb.org/?language=en

## Building for release
From project dir: `dotnet publish -c Release`

## Copying to remote
scp -r bin/Release/netcoreapp2.0/publish/* user@ip:/var/Movies

## Restarting the service
sudo systemctl restart movies.service

## Starting the service
sudo systemctl start movies.service

## Stopping the service
sudo systemctl stop movies.service

## Viewing the log
sudo journalctl -fu movies.service

## Run as user
sudo -u www-data dotnet dir/Movies.dll

## Own directory
sudo chown -R www-data:www-data /dir