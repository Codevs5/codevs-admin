export const validateUser = (data) => {
  return validateEmail(data.email) && validatePassword(data.password) && validateRole(data.role) && validateName(data.name);
}

const validateEmail = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
};

export const validatePassword = (password) => {
  return password.length >= 6;
};

const validateRole = (role) => {
  const roles = ['admin', 'user', 'editor', 'Dios']
  return roles.includes(role);
};

const validateName = (name) => {
  return name.length >= 3;
}


//TODO: Validaciones más fuertes, que estas son muy debiles.
