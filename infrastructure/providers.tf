terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
    kubernetes = {
      source  = "hashicorp/kubernetes"
      version = "~> 2.23"
    }
  }
  backend "s3" {
    bucket = "astramind-terraform-state"
    key    = "prod/terraform.tfstate"
    region = "ap-south-1" # Mumbai
  }
}

provider "aws" {
  region = var.aws_region
}
