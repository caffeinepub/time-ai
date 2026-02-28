import { AlertCircle, Calendar, FileText, DollarSign, CheckCircle, ExternalLink } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '../../components/ui/alert';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../../components/ui/accordion';
import { Button } from '../../components/ui/button';

export default function AITaxAssistance() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 max-w-5xl">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-3">
          AI Tax Assistance
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Comprehensive guidance for tax preparation and filing
        </p>
      </div>

      {/* Disclaimer */}
      <Alert className="mb-8 border-destructive/50 bg-destructive/5">
        <AlertCircle className="h-5 w-5 text-destructive" />
        <AlertTitle className="text-destructive font-semibold">Important Disclaimer</AlertTitle>
        <AlertDescription className="text-sm text-muted-foreground">
          This page provides general informational guidance only and does not constitute legal, tax, or financial advice. 
          We are not licensed tax professionals. For specific tax situations, consult a qualified CPA, enrolled agent, or tax attorney. 
          We make no guarantees regarding outcomes, refunds, or compliance.
        </AlertDescription>
      </Alert>

      {/* Who This Is For */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-primary" />
            Who This Is For
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 rounded-full bg-primary mt-2 shrink-0" />
            <p className="text-sm text-muted-foreground">
              <strong className="text-foreground">Individuals:</strong> Employees, freelancers, and gig workers preparing personal tax returns
            </p>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 rounded-full bg-primary mt-2 shrink-0" />
            <p className="text-sm text-muted-foreground">
              <strong className="text-foreground">Self-Employed:</strong> Independent contractors, consultants, and sole proprietors
            </p>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 rounded-full bg-primary mt-2 shrink-0" />
            <p className="text-sm text-muted-foreground">
              <strong className="text-foreground">Small Business Owners:</strong> Entrepreneurs managing business and personal tax obligations
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Information to Gather */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-accent" />
            Information to Gather
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-foreground mb-2">Income Documents</h3>
              <ul className="space-y-1 text-sm text-muted-foreground ml-4">
                <li>• W-2 forms from employers</li>
                <li>• 1099 forms (1099-NEC, 1099-MISC, 1099-INT, 1099-DIV, etc.)</li>
                <li>• Business income records (if self-employed)</li>
                <li>• Investment income statements</li>
                <li>• Rental property income</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-2">Expense Records</h3>
              <ul className="space-y-1 text-sm text-muted-foreground ml-4">
                <li>• Business expenses (if self-employed)</li>
                <li>• Home office expenses</li>
                <li>• Medical and dental expenses</li>
                <li>• Charitable contributions</li>
                <li>• Education expenses</li>
                <li>• Mortgage interest and property taxes</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-2">Personal Information</h3>
              <ul className="space-y-1 text-sm text-muted-foreground ml-4">
                <li>• Social Security numbers for you, spouse, and dependents</li>
                <li>• Filing status (single, married, head of household)</li>
                <li>• Prior year tax return (for reference)</li>
                <li>• Bank account information (for direct deposit)</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Key Deadlines */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-secondary" />
            Key Deadlines Overview
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="text-sm text-muted-foreground mb-3">
            These are typical US federal tax deadlines. Always verify current-year dates with the IRS.
          </p>
          <div className="space-y-2">
            <div className="flex items-start gap-3 p-3 bg-muted/30 rounded-md">
              <Calendar className="w-4 h-4 text-muted-foreground mt-0.5 shrink-0" />
              <div>
                <p className="font-semibold text-sm text-foreground">April 15</p>
                <p className="text-xs text-muted-foreground">Individual tax return filing deadline (typically)</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-muted/30 rounded-md">
              <Calendar className="w-4 h-4 text-muted-foreground mt-0.5 shrink-0" />
              <div>
                <p className="font-semibold text-sm text-foreground">Quarterly (Apr 15, Jun 15, Sep 15, Jan 15)</p>
                <p className="text-xs text-muted-foreground">Estimated tax payment deadlines for self-employed</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-muted/30 rounded-md">
              <Calendar className="w-4 h-4 text-muted-foreground mt-0.5 shrink-0" />
              <div>
                <p className="font-semibold text-sm text-foreground">October 15</p>
                <p className="text-xs text-muted-foreground">Extended filing deadline (if extension filed by April 15)</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Common Deductions & Credits */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-success" />
            Common Deductions & Credits Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">
            High-level overview of common tax benefits. Eligibility and amounts vary by individual circumstances.
          </p>
          <div className="space-y-3">
            <div className="border-l-2 border-primary pl-3">
              <h4 className="font-semibold text-sm text-foreground">Standard Deduction</h4>
              <p className="text-xs text-muted-foreground">Fixed amount that reduces taxable income (varies by filing status)</p>
            </div>
            <div className="border-l-2 border-primary pl-3">
              <h4 className="font-semibold text-sm text-foreground">Itemized Deductions</h4>
              <p className="text-xs text-muted-foreground">Mortgage interest, state/local taxes, charitable contributions, medical expenses</p>
            </div>
            <div className="border-l-2 border-accent pl-3">
              <h4 className="font-semibold text-sm text-foreground">Earned Income Tax Credit (EITC)</h4>
              <p className="text-xs text-muted-foreground">Credit for low-to-moderate income workers</p>
            </div>
            <div className="border-l-2 border-accent pl-3">
              <h4 className="font-semibold text-sm text-foreground">Child Tax Credit</h4>
              <p className="text-xs text-muted-foreground">Credit for qualifying dependent children</p>
            </div>
            <div className="border-l-2 border-accent pl-3">
              <h4 className="font-semibold text-sm text-foreground">Education Credits</h4>
              <p className="text-xs text-muted-foreground">American Opportunity Credit and Lifetime Learning Credit</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recordkeeping Checklist */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-success" />
            Recordkeeping & Documentation Checklist
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-success mt-0.5 shrink-0" />
              <p className="text-sm text-muted-foreground">Keep all tax documents for at least 3 years (7 years recommended)</p>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-success mt-0.5 shrink-0" />
              <p className="text-sm text-muted-foreground">Organize receipts by category (business, medical, charitable, etc.)</p>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-success mt-0.5 shrink-0" />
              <p className="text-sm text-muted-foreground">Maintain digital backups of important documents</p>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-success mt-0.5 shrink-0" />
              <p className="text-sm text-muted-foreground">Track mileage for business or medical travel</p>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-success mt-0.5 shrink-0" />
              <p className="text-sm text-muted-foreground">Document charitable contributions (receipts for donations over $250)</p>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-success mt-0.5 shrink-0" />
              <p className="text-sm text-muted-foreground">Keep records of estimated tax payments made throughout the year</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Step-by-Step Workflow */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Step-by-Step Filing Preparation Workflow</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex gap-3">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold text-sm shrink-0">
                1
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-1">Gather All Documents</h4>
                <p className="text-sm text-muted-foreground">Collect W-2s, 1099s, receipts, and prior year return</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold text-sm shrink-0">
                2
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-1">Determine Filing Status</h4>
                <p className="text-sm text-muted-foreground">Single, married filing jointly, head of household, etc.</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold text-sm shrink-0">
                3
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-1">Calculate Total Income</h4>
                <p className="text-sm text-muted-foreground">Add up all sources of income from your documents</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold text-sm shrink-0">
                4
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-1">Identify Deductions & Credits</h4>
                <p className="text-sm text-muted-foreground">Determine if you'll take standard or itemized deductions</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold text-sm shrink-0">
                5
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-1">Choose Filing Method</h4>
                <p className="text-sm text-muted-foreground">Tax software, professional preparer, or IRS Free File</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold text-sm shrink-0">
                6
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-1">Complete & Review Return</h4>
                <p className="text-sm text-muted-foreground">Double-check all entries for accuracy before filing</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold text-sm shrink-0">
                7
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-1">File & Pay (if applicable)</h4>
                <p className="text-sm text-muted-foreground">Submit return electronically and arrange payment if taxes owed</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold text-sm shrink-0">
                8
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-1">Keep Records</h4>
                <p className="text-sm text-muted-foreground">Store copies of your return and supporting documents</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* FAQ */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Frequently Asked Questions</CardTitle>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-left">
                Do I need to file a tax return?
              </AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground">
                Generally, you must file if your income exceeds the standard deduction for your filing status. 
                Self-employed individuals typically must file if net earnings are $400 or more. 
                Check IRS guidelines for specific thresholds.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger className="text-left">
                Should I take the standard deduction or itemize?
              </AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground">
                Take the standard deduction if it's higher than your total itemized deductions. 
                Itemize if you have significant mortgage interest, state/local taxes, charitable contributions, or medical expenses. 
                Most taxpayers benefit from the standard deduction.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger className="text-left">
                What if I can't pay my taxes by the deadline?
              </AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground">
                File your return on time even if you can't pay in full to avoid late-filing penalties. 
                The IRS offers payment plans and installment agreements. 
                Contact the IRS or consult a tax professional to discuss options.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger className="text-left">
                How do I handle self-employment income?
              </AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground">
                Report self-employment income on Schedule C. You'll also need to pay self-employment tax (Social Security and Medicare). 
                Make quarterly estimated tax payments to avoid penalties. 
                Track all business expenses to reduce taxable income.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-5">
              <AccordionTrigger className="text-left">
                What records should I keep after filing?
              </AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground">
                Keep copies of your filed return, W-2s, 1099s, receipts for deductions, and proof of payment for at least 3 years. 
                The IRS recommends 7 years for comprehensive protection. 
                Store documents securely (physical and digital backups).
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>

      {/* Official Resources */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Official IRS Resources</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <Button
              variant="outline"
              className="w-full justify-between"
              asChild
            >
              <a
                href="https://www.irs.gov"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>IRS Official Website</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </Button>
            <Button
              variant="outline"
              className="w-full justify-between"
              asChild
            >
              <a
                href="https://www.irs.gov/filing/free-file-do-your-federal-taxes-for-free"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>IRS Free File Program</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </Button>
            <Button
              variant="outline"
              className="w-full justify-between"
              asChild
            >
              <a
                href="https://www.irs.gov/forms-instructions"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>Tax Forms & Instructions</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </Button>
            <Button
              variant="outline"
              className="w-full justify-between"
              asChild
            >
              <a
                href="https://www.irs.gov/help/tax-law-questions"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>Tax Law Questions</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Final Reminder */}
      <Alert className="border-primary/50 bg-primary/5">
        <AlertCircle className="h-5 w-5 text-primary" />
        <AlertTitle className="text-primary font-semibold">Remember</AlertTitle>
        <AlertDescription className="text-sm text-muted-foreground">
          This guidance is for informational purposes only. Tax laws are complex and change frequently. 
          Always consult with a qualified tax professional for advice specific to your situation.
        </AlertDescription>
      </Alert>
    </div>
  );
}
