FROM node:lts

WORKDIR /app

# Create a docker volume for logging into:
#VOLUME [ "/logs" ]

# Copy over the package.json file so 
# dependancies can be installed inside the container:
COPY ./package.json /app/package.json

# Preparation commands:
RUN npm install

# Environment variables: (ultimately these should be loaded from a .env file)
#ENV <environment variables...>


# Command to run when the container starts:
#CMD ["npm", "run", "dev", "--", "--host"]   # use this option for running the React app in dev mode
CMD ["/bin/bash"]                          # use this option to get an interactive shell 
                                            # for troubleshooting inside container