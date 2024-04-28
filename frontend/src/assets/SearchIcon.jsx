import React from 'react';

import { Icon } from '@chakra-ui/react';
import { SearchIcon as SearchIconSvg } from '@heroicons/react/outline';

export const SearchIcon = () => (
  <Icon as={SearchIconSvg} boxSize={4} color="whiteAlpha.600" />
);

