import React from "react";
import { Button } from "reactstrap";
import  Emoji  from './Emoji';

export default ({
  isLoading,
  text,
  loadingText,
  className = "",
  disabled = false,
  ...props
}) =>
  <Button
    className={`LoaderButton ${className}`}
    disabled={disabled || isLoading}
    {...props}
  >
    {isLoading && <Emoji label="monster" className="spinner" emoji=" 👹 " />}
    {!isLoading ? text : loadingText}
    {isLoading && <Emoji label="monster" className="spinner" emoji=" 👹 " />}
  </Button>;