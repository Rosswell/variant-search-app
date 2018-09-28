import React from 'react';
import { shallow } from 'enzyme';
import GeneTable from '../GeneTable';

const genes = [
  {
    "id": 1, 
    "gene": "COX20", 
    "nucleotide_change": "NM_001312871.1:c.-39C>G", 
    "protein_change": null, 
    "other_mappings": "NM_001312871.1:c.-39C>G,NM_198076.5:c.-39C>G,NG_042825.1:g.5371C>G,NC_000001.11:g.244835676C>G,NC_000001.10:g.244998978C>G,NM_198076.4:c.-39C>G", 
    "alias": null, 
    "transcripts": "NM_001312871.1,NM_198076.5,NG_042825.1,NC_000001.11,NC_000001.10,NM_198076.4", 
    "region": null, 
    "reported_classification": "Likely benign", 
    "inferred_classification": "Variant of uncertain significance, likely benign", 
    "source": "ClinVar", 
    "last_evaluated": "Wed, 02 Mar 2016 00:00:00 GMT", 
    "last_updated": "Thu, 14 Sep 2017 00:00:00 GMT", 
    "url": "https://www.ncbi.nlm.nih.gov/clinvar/RCV000418319", 
    "submitter_comment": "This variant is considered likely benign or benign based on one or more of the following criteria: it is a conservative change, it occurs at a poorly conserved position in the protein, it is predicted to be benign by multiple in silico algorithms, and/or has population frequency not consistent with disease.", 
    "assembly": "GRCh37", 
    "chr": "1", 
    "genomic_start": 244998977.0, 
    "genomic_stop": 244998978.0, 
    "ref": "C", 
    "alt": "G", 
    "accession": "NC_000001.10", 
    "reported_ref": "C", 
    "reported_alt": "G"
  }, 
  {
    "id": 2, 
    "gene": "COX20", 
    "nucleotide_change": "NM_001312871.1:c.157+3G>C", 
    "protein_change": null, 
    "other_mappings": "NM_001312871.1:c.157+3G>C,NM_198076.5:c.157+3G>C,NG_042825.1:g.11756G>C,NC_000001.11:g.244842061G>C,NC_000001.10:g.245005363G>C,NM_198076.4:c.157+3G>C", 
    "alias": null, 
    "transcripts": "NM_001312871.1,NM_198076.5,NG_042825.1,NC_000001.11,NC_000001.10,NM_198076.4", 
    "region": null, 
    "reported_classification": "Uncertain significance", 
    "inferred_classification": "Variant of uncertain significance", 
    "source": "ClinVar", 
    "last_evaluated": "Fri, 06 Jan 2017 00:00:00 GMT", 
    "last_updated": "Thu, 14 Sep 2017 00:00:00 GMT", 
    "url": "https://www.ncbi.nlm.nih.gov/clinvar/RCV000441332", 
    "submitter_comment": "The c.157+3G>C variant in the COX20 gene has not been reported previously as a pathogenic variant nor as a benign variant, to our knowledge. This variant reduces the quality of the splice donor site in intron 2, and is expected to cause abnormal gene splicing. The c.157+3G>C variant was not observed at any significant frequency in approximately 6500 individuals of European and African American ancestry in the NHLBI Exome Sequencing Project, indicating it is not a common benign variant in these populations. We interpret c.157+3G>C as a variant of uncertain significance.", 
    "assembly": "GRCh37", 
    "chr": "1", 
    "genomic_start": 245005362.0, 
    "genomic_stop": 245005363.0, 
    "ref": "G", 
    "alt": "C", 
    "accession": "NC_000001.10", 
    "reported_ref": "G", 
    "reported_alt": "C"
  }
];

test('GeneTable renders properly', () => {
  const wrapper = shallow(<GeneTable data={genes}/>);
  const element = wrapper.find('ReactTable');
  expect(element.length).toBe(1);
});

test('GeneTable should have 2 rows of variants', () => {
  const wrapper = shallow(<GeneTable data={genes}/>);
  const element = wrapper.find('ReactTable');
  expect(element.get(0).props.data.length).toBe(2);
});

test('GeneTable variants should have the proper id', () => {
  const wrapper = shallow(<GeneTable data={genes}/>);
  const element = wrapper.find('ReactTable');
  expect(element.length).toBe(1);
  element.get(0).props.data.map((variant, i) => {
    expect(variant.id).toBe(i + 1);
  })
});

test('GeneTable should not render any variants if provided no data', () => {
  const wrapper = shallow(<GeneTable data={{}}/>);
  const element = wrapper.find('ReactTable');
  expect(!element.get(0).props.data).toBe(false);
});

test('GeneTable should not update its variants if provided new data', () => {
  let wrapper = shallow(<GeneTable data={genes}/>);
  let element = wrapper.find('ReactTable');
  expect(element.get(0).props.data.length).toBe(2);

  genes.push(...genes);
  expect(genes.length).toBe(4);

  wrapper = wrapper.setProps(genes)
  element = wrapper.find('ReactTable');
  expect(element.get(0).props.data.length).toBe(4);
});
