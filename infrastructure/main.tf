module "vpc" {
  source = "terraform-aws-modules/vpc/aws"
  name   = "astramind-vpc"
  cidr   = "10.0.0.0/16"

  azs             = ["${var.aws_region}a", "${var.aws_region}b"]
  private_subnets = ["10.0.1.0/24", "10.0.2.0/24"]
  public_subnets  = ["10.0.101.0/24", "10.0.102.0/24"]

  enable_nat_gateway = true
  single_nat_gateway = true
}

module "eks" {
  source  = "terraform-aws-modules/eks/aws"
  version = "~> 19.0"

  cluster_name    = var.cluster_name
  cluster_version = "1.28"
  vpc_id          = module.vpc.vpc_id
  subnet_ids      = module.vpc.private_subnets

  eks_managed_node_groups = {
    core = {
      min_size     = 2
      max_size     = 10
      desired_size = 3
      instance_types = ["t3.xlarge"] # Need heavy compute for Agents & ML
    }
  }
}

resource "aws_db_instance" "postgres" {
  identifier           = "astramind-rds"
  allocated_storage    = 100
  engine               = "postgres"
  engine_version       = "15.4"
  instance_class       = "db.t3.large"
  username             = "astramind_admin"
  password             = var.db_password
  skip_final_snapshot  = true
  publicly_accessible  = false
  vpc_security_group_ids = [module.vpc.default_security_group_id]
  db_subnet_group_name = aws_db_subnet_group.default.name
}

resource "aws_db_subnet_group" "default" {
  name       = "astramind-db-subnet-group"
  subnet_ids = module.vpc.private_subnets
}
