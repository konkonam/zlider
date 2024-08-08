{ pkgs ? import <nixpkgs> {} }:

pkgs.mkShell {
  name = "zlider";

    buildInputs =[
        pkgs.nodejs
    ];
}
