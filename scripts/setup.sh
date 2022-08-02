#!/bin/bash
clear
user="cyberomin"

if [ -n "$DEPLOYMENT_ENVIRONMENT" ]; then
    environment=$DEPLOYMENT_ENVIRONMENT
else
    echo -n "Enter the environment you are setting to, followed by [ENTER]: "
    read env
fi

environment="$(tr '[:upper:]' '[:lower:]' <<< ${env})"
if [[ $environment != 'staging' && $environment != 'production' ]]; then
    echo "You entered a wrong environment"
    exit 1;
fi
echo "Begining deployment to the $environment environment"
ansible-playbook deploy/$environment/setup.yml -u $user -i deploy/$environment/inventory.ini --vault-id ~/.ansible/key --extra-vars 'ansible_become_pass="{{ sudo_password }}"'
