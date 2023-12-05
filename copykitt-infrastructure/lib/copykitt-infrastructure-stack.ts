import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as apiGateway from 'aws-cdk-lib/aws-apigateway';
import * as dotenv from "dotenv";

dotenv.config()

export class CopykittInfrastructureStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    //lambda layer
    const layer = new lambda.LayerVersion(this, "Baselayer", {
      code : lambda.Code.fromAsset("lambda_base_layer/layer.zip"),
      compatibleRuntimes : [lambda.Runtime.PYTHON_3_9],
    })

    //api function
    const apilambda = new lambda.Function(this, "ApiFunction", {
      runtime: lambda.Runtime.PYTHON_3_9,
      code : lambda.Code.fromAsset("../app"),
      handler : "copykitt-api.handler",
      layers : [layer],
      environment : {
        OPENAI_API_KEY : process.env.OPENAI_API_KEY ?? "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",
      }
    })

    //apiGateway
    const copyKittApi = new apiGateway.RestApi(this, "RestApi", {
      restApiName : "CopyKitt API"
    })

    //Lambda integration (proxy)
    copyKittApi.root.addProxy({
      defaultIntegration: new apiGateway.LambdaIntegration(apilambda) 
    });

    


  }
}
