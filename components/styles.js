/***********************************
 * Styles used to customise login  *
 * and registration form.          *
 ***********************************/

/**********************************
* These styles use @emotion/react.*
***********************************/
export const backgroundStyle = {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#DFC920',
    //backgroundImage: 'url("https://media.istockphoto.com/photos/blurred-background-blur-products-on-shelves-at-grocery-store-picture-id1144268855")'
}

export const formStyle = (browserWidth) => {
    // defaults for mobile
    let divWidth = "100%"
    let marginTop = 0

    // change values for desktop
    if (browserWidth >= 700) {
        divWidth = 550
        marginTop = '4em'
    }
    return {
        minWidth: divWidth,
        maxWidth: divWidth,
        textAlign: 'center',
        backgroundColor: 'white',
        borderRadius: '2%',
        padding: '1.5em',
        marginTop: marginTop
    }
}

/**********************************
 * These styles are for MUI.      *
 ***********************************/

export const linkStyles = {
    textDecoration: 'none'
}

export const textStyles = {
    marginTop: '1em'
}

export const buttonStyles = {
    marginTop: '1em',
    fontWeight: 'bold'
}

export const iconStyles = {
    padding: '0.5em',
    display: 'block',
    margin: 'auto',
    color: 'white',
    backgroundColor: '#BDBDBD',
    borderRadius: '100%',
}
