import { TrendingUp } from 'lucide-react';
import { SolutionTemplate } from './SolutionTemplate';

export function Databricks() {
  return (
    <SolutionTemplate
      title="Databricks"
      icon={TrendingUp}
      description="Unified analytics platform built on Apache Spark for data engineering and machine learning"
      problems={[
        { description: 'Data lake complexity and data quality management' },
        { description: 'ML model development and production deployment gap' },
        { description: 'Spark cluster optimization and cost management' },
        { description: 'Collaboration between data engineers, scientists, and analysts' },
      ]}
      solutions={[
        { description: 'Delta Lake with ACID transactions and schema enforcement for reliable data lakes' },
        { description: 'MLflow for end-to-end ML lifecycle management and model registry' },
        { description: 'Photon engine with intelligent autoscaling and spot instance optimization' },
        { description: 'Collaborative notebooks with version control and real-time co-authoring' },
      ]}
    />
  );
}
